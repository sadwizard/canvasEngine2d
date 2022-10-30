export const SHAPE_TYPES = {
    CIRCLE: 'circle',
    RECTANGLE: 'rectangle',
    IMAGE: 'image',
} as const;

type Shape = typeof SHAPE_TYPES;
type ShapesValues = keyof Shape;

export type Shapes = Shape[ShapesValues];