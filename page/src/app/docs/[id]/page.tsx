import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import {ReactElement, ReactNode} from "react";
import {css} from "@/styled-system/css";

export const runtime = 'edge';

interface ImgProps {
    src?: string;  // src is now optional
    alt?: string;
    children?: ReactNode;
}

const components = {
    img: ({src, alt, children}: ImgProps): ReactElement =>
        <Image className={css({display: "block", padding: "20px"})} src={src!!} alt={alt!!} width={1920}
               height={1080}>{children}</Image>,
};

export default async function RemoteMdxPage({params}: { params: { id: string } }) {
    // MDX text - can be from a local file, database, CMS, fetch, anywhere...
    const id = params.id
    const res = await fetch("https://resources.s3.nikomaru.dev/" + id + "/docs.md")
    const markdown = await res.text()


    const urlTransform = (url: string) => {
        if (!url.startsWith("./static")) {
            return url
        }
        return `https://resources.s3.nikomaru.dev/${id}/${url.replace("./", "")}`
    }

    return (<div className={css({backgroundColor: "#d1f9d4", padding: "100px"})}>
        <div className={css({
            width: "800px",
            margin: "auto",
            padding: "50px",
            fontSize: "l",
            backgroundColor: "white",
        })}>
            <ReactMarkdown className='markdown'
                           urlTransform={urlTransform}
                           remarkPlugins={[remarkGfm, remarkBreaks]}
                           components={components}>{markdown}</ReactMarkdown>
        </div>
    </div>)
}