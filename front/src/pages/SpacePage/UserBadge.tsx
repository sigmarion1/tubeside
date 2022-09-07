import { Avatar, Tag, TagLabel } from "@chakra-ui/react";

interface userBadgeProps {
  currentUserName: string;
  userName: string;
  isSyncUser: boolean;
}

const UserBadge = ({
  userName,
  currentUserName,
  isSyncUser,
}: userBadgeProps) => {
  const bgColor = userName === currentUserName ? "red.500" : "gray.500";

  return (
    <Tag
      size="sm"
      borderRadius="full"
      m={1}
      // boxShadow={"lg"}
      bg={bgColor}
    >
      <Avatar
        src={`https://avatars.dicebear.com/api/adventurer-neutral/${userName}.svg`}
        size="xs"
        name="Segun Adebayo"
        ml={-1}
        mr={2}
      />
      <TagLabel>{userName} </TagLabel>
      {isSyncUser && <TagLabel textColor={"gray.400"}>(manager)</TagLabel>}
    </Tag>
  );
};

export default UserBadge;
