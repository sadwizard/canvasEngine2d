export const SHAPE_TYPES = {
    CIRCLE: 'circle',
    RECTANGLE: 'rectangle',
    IMAGE: 'image',
    GROUP: 'group',
} as const;

type Shape = typeof SHAPE_TYPES;
type ShapesValues = keyof Shape;

export type TShapeTypes = Shape[ShapesValues];