import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

const components: Readonly<MDXComponents> | MergeComponents | null | undefined =
  {
    h1: (props) => (
      <h1 {...props} className="large-text">
        {props.children}
      </h1>
    ),
    p: (props) => (
      <p {...props} className="text-sm text-red-600">
        {props.children}
      </p>
    ),
    img: (props) => (
      <Image {...props}  width={100} height={100} alt="" />
    ),
  };

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
