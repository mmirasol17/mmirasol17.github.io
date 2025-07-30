import Markdown from "react-markdown";

interface MarkdownTextProps {
  children: string;
}
export function MarkdownText(props: Readonly<MarkdownTextProps>) {
  return (
    <Markdown
      components={{
        p: ({ node, ...props }) => (
          <p
            className='text-white text-sm mb-4 leading-relaxed'
            {...props}
          />
        ),
        a: ({ node, ...props }) => (
          <a
            className='text-blue-300 font-bold hover:underline'
            target='_blank'
            rel='noopener noreferrer'
            title={props.href}
            {...props}
          />
        ),
        code: ({ node, ...props }) => (
          <code
            className='bg-gray-800 text-white px-1 rounded'
            {...props}
          />
        ),
      }}
    >
      {props.children}
    </Markdown>
  );
}
