type Params = {
  tags: string[] | undefined;
  onClick: (tag: string) => void;
};

export const Tags = ({ tags, onClick }: Params) =>
  tags?.length ? (
    <div>
      {tags.map((tag, index) => (
        <button key={index} type="button" onClick={() => onClick(tag)}>
          {tag}
        </button>
      ))}
    </div>
  ) : null;
