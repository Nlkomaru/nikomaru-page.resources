import {css} from '@/styled-system/css';
import React from "react";
import SlideCard from "~/components/SlideCard";

export const runtime = "edge";

export default async function Home() {
    let bucket = process.env.BUCKET

    if (!bucket) {
        throw new Error("BUCKET is not defined in the environment");
    }
    let list = (await bucket.list()).objects.map((o) => o.key.split("/")[0])
    let data = Array.from(new Set(list))

    let slideList: SlideGroup[] = [
        {
            "Group": "Container",
            "list": [
                {slide: "container-1", title: "コンテナについて"},
                {slide: "docker-1", title: "Dockerについて"},
                {slide: "kubernetes-1", title: "Kubernetesについて"},
            ]
        }
    ]

    slideList.forEach((group) => {
        group.list.map((slide) => {
            data = data.filter(n => n !== slide.slide);
        })
    })

    if (data.length !== 0) {
        slideList.push({
            "Group": "その他",
            "list": data.map((slide) => {
                return {slide: slide, title: slide}
            })
        })
    }

    return (
        <>
            <div className={css({fontSize: "xl", fontWeight: 'bold', paddingBottom: "30px"})}>Slide List</div>

            {slideList.map((slide) => (
                <>
                    <h2 className={css({fontSize: "xl", fontWeight: 'bold', paddingBottom: "10px"})}>{slide.Group}</h2>
                    <ul className={css({display: "flex"})}>
                        {slide.list
                            .map((slideName) => getSlideInfo(slideName.slide, slideName.title))
                            .map((slideInfo) => (
                                <li key={slideInfo.slideTitle}>
                                    <SlideCard slideInfo={slideInfo}/>
                                </li>
                            ))}
                    </ul>
                </>
            ))
            }
        </>
    )
}

function getSlideInfo(slide: string, title: string): SlideInfo {
    return {
        slideTitle: title,
        slideName: slide,
        slideUrl: `https://resources.s3.nikomaru.dev/${slide}/index.html`,
        pdfUrl: `https://resources.s3.nikomaru.dev/${slide}/slidev-exported.pdf`,
        imageUrl: `https://resources.s3.nikomaru.dev/${slide}/picture/1.png`,
    }
}

export type SlideInfo = {
    slideTitle: string;
    slideName: string;
    slideUrl: string;
    pdfUrl: string;
    imageUrl: string;
}

export type SlideGroup = {
    Group: string;
    list: slide[];
}

export type slide = {
    slide: string;
    title: string;
}



declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BUCKET: R2Bucket;
        }
    }
}