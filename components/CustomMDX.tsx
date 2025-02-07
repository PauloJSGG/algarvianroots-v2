import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
// import parse from 'html-react-parser'
// import rehypeReact from "rehype-react";

// const components: Readonly<MDXComponents> | MergeComponents | null | undefined =
const components = {
  h1: (props: { children: React.ReactNode }) => (
    <h1 {...props} className="large-text">
      {props.children}
    </h1>
  ),
  p: (props: { children: React.ReactNode }) => (
    <p {...props} className="text-sm">
      {props.children}
    </p>
  ),
  span: (props: { children: string }) => <h1>hay</h1>,
  img: (props: { src: string }) => (
    <Image {...props} width={300} height={300} alt="" />
  ),
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          // plugin to fix html parsing to react
          // rehypePlugins: [rehypeReact],
          format: "mdx",
        },
      }}
    />
  );
}
