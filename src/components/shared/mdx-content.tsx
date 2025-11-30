'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';

const mdxComponents = {
  h1: (props: any) => (
    <h1 className="mt-8 mb-4 text-4xl font-bold" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="mt-8 mb-4 text-3xl font-semibold" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mt-6 mb-3 text-2xl font-semibold" {...props} />
  ),
  p: (props: any) => <p className="mb-4 leading-7" {...props} />,
  ul: (props: any) => (
    <ul className="mb-4 list-inside list-disc space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-4 list-inside list-decimal space-y-2" {...props} />
  ),
  code: (props: any) => (
    <code
      className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre className="bg-muted mb-4 overflow-x-auto rounded-lg p-4" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-primary text-muted-foreground my-4 border-l-4 pl-4 italic"
      {...props}
    />
  ),
};

interface MDXContentProps {
  code: string;
}

function RenderMDX({ Component }: { Component: any }) {
  return <Component components={mdxComponents} />;
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <RenderMDX Component={Component} />
    </div>
  );
}
