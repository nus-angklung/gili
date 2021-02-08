export function sliderHandlers() {
    let min;
    let max;
    let step;
    let current;
    let sliding;
    let slider;
    let scale;

    function handleMouseMove(e) {
        if (sliding) {
            const distance = e.clientX - slider.getBoundingClientRect().left;
            const value = Math.round(distance / scale) * step;
            current = Math.max(Math.min(value, max), min);
        }
    }

    async function handleMouseDown(e) {
        sliding = true;

        const distance = e.clientX - slider.getBoundingClientRect().left;
        const value = Math.round(distance / scale) * step;
        current = value;
    }

    function handleKeyDown(e) {
        if (e.keyCode === 37) {
            e.preventDefault();
            const nextValue = current - step;
            current = Math.max(nextValue, min);
        } else if (e.keyCode === 39) {
            e.preventDefault();
            const nextValue = current + step;
            current = Math.min(nextValue, max);
        }
    }

    function handleMouseUp(e) {
        sliding = false;
    }
}
