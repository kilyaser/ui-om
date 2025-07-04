/// <reference types="vite/client" />
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg"
declare module "*.svg" {
    import React from "react";
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
