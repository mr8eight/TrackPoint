const ActionEvent: React.FC = () => {
  const arr = new Array(1).fill(0);
  return (
    <>
      {arr.map(() => (
        <div>ActionEvent</div>
      ))}
    </>
  );
};

export default ActionEvent;
