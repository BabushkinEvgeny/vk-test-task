import { Avatar, Div, SimpleCell } from "@vkontakte/vkui";
import { Group as GroupType } from "../../types";
import { useState } from "react";

export const Group = ({ group }: { group: GroupType }) => {
  const [isFriendsVisible, setIsFriendsVisible] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const friendsListStyle = {
    maxHeight: isFriendsVisible ? "200px" : "0",
    overflow: "hidden",
    transition: "max-height 0.3s ease-out",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: isFriendsVisible ? "10px" : "0 10px",
    margin: "10px 0",
  };

  const baseStyle = {
    padding: "12px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center" as const,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };
  const hoverStyle = {
    ...baseStyle,
    transform: "scale(1.03)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    cursor: "pointer",
  };

  const avatarColor = group.avatar_color || "#C4C4C4";

  return (
    <Div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isHovered ? hoverStyle : baseStyle}
    >
      {group.name}
      <SimpleCell
        before={
          <Avatar
            style={{
              backgroundColor: avatarColor,
              border: "1px solid grey",
              borderRadius: "50px",
            }}
            size={100}
          />
        }
        after="Дополнительная информация"
        onClick={() => setIsFriendsVisible(!isFriendsVisible)}
        subtitle={`Подписчиков: ${group.members_count}, Друзей в группе: ${
          group.friends?.length || 0
        }`}
        style={{
          marginBottom: "10px",
          borderRadius: "10px",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></SimpleCell>
      {isFriendsVisible && group.friends && group.friends.length > 0 && (
        <Div style={{ marginTop: "10px" }}>
          Друзья в группе:
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {group.friends.map((friend, index) => (
              <li
                key={index}
                style={{ padding: "2px 0" }}
              >{`${friend.first_name} ${friend.last_name}`}</li>
            ))}
          </ul>
        </Div>
      )}
    </Div>
  );
};
