type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div className="w-[800px] px-5 py-6 rounded bg-neutral-100 shadow-lg">
      {children}
    </div>
  );
};

export default Card;
