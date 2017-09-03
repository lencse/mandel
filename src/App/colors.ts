import { maxIterations } from './lib'

const colors: string[] = []

const mainColors = [
    [47, 149, 153],
    [247, 219, 79],
    [242, 107, 56],
    [236, 32, 73],
    [167, 34, 110]
]

let mc = []

for (let i = 0; i < 6; ++i) {
    mc = mc.concat(mainColors)
}

for (let i = 0; i < maxIterations; ++i) {
    const idx = Math.ceil((i + 1) * (mc.length - 1) / maxIterations)
    const den = Math.ceil(maxIterations / (mc.length - 1))
    const p = ((i + 1) % den) / den

    const c1 = mc[idx - 1]
    const c2 = mc[idx]
    const r = Math.round(c1[0] * (1-p) + c2[0] * p)
    const g = Math.round(c1[1] * (1-p) + c2[1] * p)
    const b = Math.round(c1[2] * (1-p) + c2[2] * p)

    colors.push(`rgb(${r}, ${g}, ${b})`)
}

export default colors
