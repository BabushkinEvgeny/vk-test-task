import React, { ChangeEvent, useEffect, useState } from "react";
import { getGroupsMock } from "../../mock/getGroupsMock";
import { Group } from "../group";
import { Group as GroupType } from "../../types";
const MainPage = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [loading, setLoading] = useState(true);
  const [privacyFilter, setPrivacyFilter] = useState("all");
  const [avatarColorFilter, setAvatarColorFilter] = useState("any");
  const [hasFriendsFilter, setHasFriendsFilter] = useState(false);
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);

  useEffect(() => {
    getGroupsMock()
      .then((response) => {
        if (response.result === 1 && response.data) {
          setGroups(response.data);
          console.log("запрос");
        } else {
          setGroups([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setGroups([]);
      })
      .finally(() => setLoading(false));
    const allColors = groups.map((group) => group.avatar_color).filter(Boolean);
    const setColors = [...new Set(allColors)];
    const uniqueColorsArr = Array.from(setColors).filter(Boolean) as string[];
    setUniqueColors(uniqueColorsArr);
  }, []);

  const filteredGroups = groups.filter((group) => {
    const privacyCondition =
      privacyFilter === "all" ||
      (privacyFilter === "open" && !group.closed) ||
      (privacyFilter === "closed" && group.closed);
    const avatarColorCondition =
      avatarColorFilter === "any" || group.avatar_color === avatarColorFilter;
    const hasFriendsCondition =
      !hasFriendsFilter || (group.friends && group.friends.length > 0);
    return privacyCondition && avatarColorCondition && hasFriendsCondition;
  });

  const handlePrivacyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPrivacyFilter(event.target.value);
  };

  const handleAvatarColorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAvatarColorFilter(event.target.value);
  };

  const handleHasFriendsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasFriendsFilter(event.target.checked);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label>
          Тип приватности:
          <select value={privacyFilter} onChange={handlePrivacyChange}>
            <option value="all">Все</option>
            <option value="open">Открытая</option>
            <option value="closed">Закрытая</option>
          </select>
        </label>
        <label>
          Цвет аватара:
          <select value={avatarColorFilter} onChange={handleAvatarColorChange}>
            <option value="any">Любой</option>
            {uniqueColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
        <label>
          Только с друзьями в группе:
          <input
            type="checkbox"
            checked={hasFriendsFilter}
            onChange={handleHasFriendsChange}
          />
        </label>
      </div>
      {filteredGroups.map((group) => (
        <Group key={group.id} group={group} />
      ))}
    </div>
  );
};

export default MainPage;
