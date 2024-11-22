import React from "react";
import Slider from "rc-slider";
import { cn } from "rizzui";
import "rc-slider/assets/index.css";

const rangeStyles = {
    base: "[&>.rc-slider-rail]:bg-muted [&>.rc-slider-handle]:opacity-100 [&>.rc-slider-handle-dragging]:!shadow-none [&>.rc-slider-handle-dragging]:ring-1",
    size: {
        md: "",
    },
    color: {
        primary:
            `[&>.rc-slider-track]:bg-zinc-800 [&>.rc-slider-handle]:border-black
             [&>.rc-slider-handle]:bg-black [&>.rc-slider-handle-dragging]:!border-black
            [&>.rc-slider-handle-dragging]:border-black
             [&>.rc-slider-step>.rc-slider-dot-active]:border-black`,
    },
};

export default function RangeSlider({
    size = "sm",
    color = "primary",
    className,
    ...props
}) {
    return (
        <Slider
            className={cn(
                rangeStyles.base,
                rangeStyles.size[size],
                rangeStyles.color[color],
                className
            )}
            {...props}
        />
    );
}

RangeSlider.displayName = "RangeSlider";