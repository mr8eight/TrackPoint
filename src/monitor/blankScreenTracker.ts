/*
    白屏监测
    type：blankScreen
    {
        
    }
*/

import { lazyReport } from "./report";

interface Callback {
    (): void;
}

function domOnload(callback: Callback): void {
    if (document.readyState === "complete") {
        callback();
    } else {
        window.addEventListener("load", callback);
    }
}

export function blankScreen(): void {
    // 需要检测的元素
    const wrapperElements: string[] = ["html", "body", "#container", ".content"];
    let emptyPoints: number = 0;

    function getSelector(element: Element): string {
        if (element.id) {
            return `#${element.id}`;
        } else if (element.className) {
            return "." + (element.className as string)
                .split(" ")
                .filter(item => !!item)
                .join(".");
        } else {
            return element.nodeName.toLowerCase();
        }
    }

    function isWrapper(element: Element): void {
        const selector: string = getSelector(element);
        if (wrapperElements.indexOf(selector) !== -1) {
            emptyPoints++;
        }
    }

    domOnload((): void => {
        for (let i = 1; i <= 9; i++) {
            const xElements: Element[] = document.elementsFromPoint(
                window.innerWidth * i / 10,
                window.innerHeight / 2
            );
            const yElements: Element[] = document.elementsFromPoint(
                window.innerWidth / 2,
                window.innerHeight * i / 10
            );
            if (xElements.length > 0) {
                isWrapper(xElements[0]);
            }
            if (yElements.length > 0) {
                isWrapper(yElements[0]);
            }
        }

        if (emptyPoints >= 18) {
            lazyReport("blankScreen", {
                type: "blankScreen",
                screen: `${window.screen.width}x${window.screen.height}`,
                viewPoint: `${window.innerWidth}x${window.innerHeight}`
            });
        }
    });
}