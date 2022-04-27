type Params = {
  tags: string[] | undefined;
  push: (obj: any) => void;
};

export const Tags = ({ tags, push }: Params) =>
  tags?.length ? (
    <div>
      {tags.map((tag, index) => (
        <button key={index} type="button" onClick={() => push(tag)}>
          {tag}
        </button>
      ))}
    </div>
  ) : null;
