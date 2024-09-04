import { z } from "zod";

export const CropSchema = z.object({
  crop: z.string().min(1, "Crop name is required"),
  variety: z.string().optional(),
  noOfPlants: z.number().optional(),
  pruningDate: z.date().optional(),
  expectedHarvestDate: z.date().optional(),
  expectedQuantityInTonnes: z.number().optional(),
  farmerId: z.string().min(1, "Farmer ID is required"),
});

export type CropType = z.infer<typeof CropSchema>;
