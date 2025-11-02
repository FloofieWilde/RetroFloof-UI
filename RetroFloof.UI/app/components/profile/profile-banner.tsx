import type { UserProfile } from "@retroachievements/api";
import {styled} from "styled-components";
import FlexColumn from "~/style/containers/FlexColumn.style";
import FlexRow from "~/style/containers/FlexRow.style";

interface PropsType {
    profile: UserProfile;
}

export default function ProfileBanner({profile}: PropsType) {
    return (
        <BannerContainer>
            <FlexRow>
                <ProfileImage src={`https://retroachievements.org/Images/Profiles/${profile?.userPic}`} alt="Profile Banner" />
                <FlexColumn style={{flex:1}}>
                    <h2>{profile?.user}</h2>
                    <p>{profile?.motto}</p>
                </FlexColumn>
            </FlexRow>
        </BannerContainer>
    );
}

const BannerContainer = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-between;
`

const ProfileImage = styled.img`
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 20px;
`