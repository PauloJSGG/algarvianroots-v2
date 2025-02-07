import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";

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
  img: (props: { src: string }) => (
    <Image {...props} width={500} height={500} alt="" className="" />
  ),
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
