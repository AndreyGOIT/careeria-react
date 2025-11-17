// src/componets/Message.tsx

export type MessageProps = {
  isPositive: boolean;
  message: string;
};

const Message = ({ isPositive, message }: MessageProps) => {
  let tyyli = "";
  if (isPositive) {
    tyyli = "message-positive";
  } else {
    tyyli = "message-negative";
  }
  return <div className={tyyli}>{message}</div>;
};

export default Message;
