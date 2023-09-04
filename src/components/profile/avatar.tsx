
import { Avatar as AntdAvatar } from "antd";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../routes/route";


interface AvatarProps {
    user: {
        id: string;
        username: string;
        avatar: string;
    };
    size?: "small" | "default" | "large" | number;
    overrideAvatar?: string | null;
}

export default function Avatar({
    user,
    size = "default",
    overrideAvatar = null,
}: AvatarProps) {
    return (
        <Link to={`${PROTECTED}/profile/${user.id}`}>
            <AntdAvatar
                src={overrideAvatar || user.avatar}
                size={size}
                style={{ cursor: "pointer", opacity: 0.8 }}
            >
                
            </AntdAvatar>
        </Link>
    );
}
