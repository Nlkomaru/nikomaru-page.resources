import * as Card from "~/components/ui/card";
import {css} from "@/styled-system/css";
import Image from "next/image";
import Link from "next/link";
import {IconButton} from "~/components/ui/icon-button";
import {FileCode2, FileText, Presentation} from "lucide-react";
import React from "react";
import {SlideInfo} from "~/app/page";

export default function SlideCard(props: { slideInfo: SlideInfo }) {
    let {slideInfo} = props;
    return (<>
        <Card.Root width="xs" className={css({
            outline: "1px solid",
            outlineColor: "gray.light.a5",
            margin: "20px"
        })}>
            <Card.Header className={css({
                padding: "0px 0px 0px 0px",
                outline: "1px solid",
                outlineColor: "black"
            })}>
                <Image width={1920} height={1080} src={slideInfo.imageUrl} alt={slideInfo.slideTitle}/>
            </Card.Header>
            <hr style={{
                color: "gray",
                backgroundColor: "gray",
                height: 2
            }}/>
            <Card.Body className={css({padding: "5px 0px 0px 20px"})}>
                <div className={css({fontSize: "xl"})}>{slideInfo.slideTitle}</div>
            </Card.Body>

            <Card.Footer gap="3">

                <Link href={"/docs/" + slideInfo.slideName} target="_blank"
                      rel="noopener noreferrer">
                    <IconButton className={css({
                        backgroundColor: "white",
                        outline: "1px solid",
                        outlineColor: "black"
                    })} aria-label="Show slidev">
                        <FileCode2 color="black"/>
                    </IconButton>
                </Link>

                <Link href={slideInfo.slideUrl} target="_blank"
                      rel="noopener noreferrer">
                    <IconButton className={css({
                        backgroundColor: "white",
                        outline: "1px solid",
                        outlineColor: "black"
                    })} aria-label="Show slidev">
                        <Presentation color="black"/>
                    </IconButton>
                </Link>

                <Link href={slideInfo.pdfUrl} target="_blank"
                      rel="noopener noreferrer">
                    <IconButton className={css({
                        backgroundColor: "white",
                        outline: "1px solid",
                        outlineColor: "black"
                    })} aria-label="Download pdf">
                        <FileText color="black"/>
                    </IconButton>
                </Link>
            </Card.Footer>
        </Card.Root></>)
}
