# RetroLauncher.ps1
param (
    [string]$url
)

if (-not $url) {
    Write-Host "Aucune URL fournie. Lancement de RetroArch..."
    Start-Process -FilePath "retroarch" -WorkingDirectory $PSScriptRoot
    Read-Host "Appuyez sur Entrée pour quitter..."
    exit
}

# Exemple d'URL : retro://launch/snes9x/Super%20Mario%20World.smc
if ($url -match '^retro://([^/]+)/([^/]+)/(.+)$') {
    $action = $matches[1]       # "command" (e.g., "launch")
    $core   = $matches[2]       # "core"
    $rom    = $matches[3]       # "iso/rom"

    # Décoder les caractères encodés (%20 => espace)
    $core = [System.Uri]::UnescapeDataString($core)
    $rom  = [System.Uri]::UnescapeDataString($rom)

    if ($action -eq "launch") {
        # Définir les chemins
        $retroarchPath = "retroarch.exe"
        $corePath      = "$PSScriptRoot\cores\${core}_libretro.dll"
        $romPath       = "$PSScriptRoot\iso\$rom"
        $configPath    = ""

        $appendConfig = ""
        if ($configPath) {
            $appendConfig = "--append-config `"$configPath`""
        }

        # Lancer RetroArch
        Start-Process -FilePath $retroarchPath -WorkingDirectory $PSScriptRoot -ArgumentList "-L `"$corePath`" `"$romPath`" $appendConfig"
    } else {
        Write-Host "Action non reconnue, strating RetroArch anyways : $action"
        Read-Host "Appuyez sur Entrée pour quitter..."
    }
} else {
    Write-Host "Format d'URL invalide : $url"
    Read-Host "Appuyez sur Entrée pour quitter..."
}
