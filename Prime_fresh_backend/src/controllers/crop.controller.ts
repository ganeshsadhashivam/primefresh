import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
} from "inversify-express-utils";
import { CropService } from "../services/crop.service";
import { TYPES } from "../types";
import { validate } from "../middleware/validate";
import { CropSchema, CropType } from "../schemas/crop.schema";
import { z } from "zod"; // Import Zod

@controller("/crops")
export class CropController {
  constructor(@inject(TYPES.CropService) private cropService: CropService) {}

  @httpGet("/")
  public async getAllCrops(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const crops = await this.cropService.getAllCrops();
      res.json(crops);
    } catch (error) {
      next(error); // Passes the error to the error-handling middleware
    }
  }

  @httpGet("/:id")
  public async getCropById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const crop = await this.cropService.getCropById(req.params.id);
      if (crop) {
        res.json(crop);
      } else {
        res.status(404).send("Crop not found");
      }
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/", validate(CropSchema))
  public async createCrop(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cropData: CropType = CropSchema.parse(req.body);
      const newCrop = await this.cropService.createCrop(cropData);
      res.status(201).json(newCrop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json(error.errors);
      } else {
        next(error);
      }
    }
  }

  @httpPut("/:id", validate(CropSchema.partial())) // Using partial schema for update
  public async updateCrop(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cropData: Partial<CropType> = CropSchema.partial().parse(req.body);
      const updatedCrop = await this.cropService.updateCrop(
        req.params.id,
        cropData
      );
      if (updatedCrop) {
        res.json(updatedCrop);
      } else {
        res.status(404).send("Crop not found");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json(error.errors);
      } else {
        next(error);
      }
    }
  }

  @httpDelete("/:id")
  public async deleteCrop(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const deleted = await this.cropService.deleteCrop(req.params.id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send("Crop not found");
      }
    } catch (error) {
      next(error);
    }
  }
}

// import { Request, Response } from "express";
// import { inject } from "inversify";
// import {
//   controller,
//   httpGet,
//   httpPost,
//   httpPut,
//   httpDelete,
// } from "inversify-express-utils";
// import { CropService } from "../services/crop.service";
// import { TYPES } from "../types";
// import { validate } from "../middleware/validate";
// import { CropSchema } from "../schemas/crop.schema";

// @controller("/crops")
// export class CropController {
//   constructor(@inject(TYPES.CropService) private cropService: CropService) {}

//   @httpGet("/")
//   public async getAllCrops(req: Request, res: Response): Promise<void> {
//     const crops = await this.cropService.getAllCrops();
//     res.json(crops);
//   }

//   @httpGet("/:id")
//   public async getCropById(req: Request, res: Response): Promise<void> {
//     const crop = await this.cropService.getCropById(req.params.id);
//     if (crop) {
//       res.json(crop);
//     } else {
//       res.status(404).send("Crop not found");
//     }
//   }

//   @httpPost("/", validate(CropSchema))
//   public async createCrop(req: Request, res: Response): Promise<void> {
//     try {
//       const cropData = CropSchema.parse(req.body);
//       const newCrop = await this.cropService.createCrop(cropData);
//       res.status(201).json(newCrop);
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         res.status(400).json(error.errors);
//       } else {
//         res.status(500).json({ message: "Internal server error" });
//       }
//     }
//   }

//   @httpPut("/:id", validate(CropSchema.partial())) // Using partial schema for update
//   public async updateCrop(req: Request, res: Response): Promise<void> {
//     try {
//       const cropData = CropSchema.partial().parse(req.body);
//       const updatedCrop = await this.cropService.updateCrop(
//         req.params.id,
//         cropData
//       );
//       if (updatedCrop) {
//         res.json(updatedCrop);
//       } else {
//         res.status(404).send("Crop not found");
//       }
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         res.status(400).json(error.errors);
//       } else {
//         res.status(500).json({ message: "Internal server error" });
//       }
//     }
//   }

//   @httpDelete("/:id")
//   public async deleteCrop(req: Request, res: Response): Promise<void> {
//     const deleted = await this.cropService.deleteCrop(req.params.id);
//     if (deleted) {
//       res.status(204).send();
//     } else {
//       res.status(404).send("Crop not found");
//     }
//   }
// }

// import { Request, Response } from "express";
// import { inject } from "inversify";
// import {
//   controller,
//   httpGet,
//   httpPost,
//   httpPut,
//   httpDelete,
// } from "inversify-express-utils";
// import { CropService } from "../services/crop.service";
// import { TYPES } from "../types";
// import { Crop } from "../entities/crop.entity";
// import { validate } from "../middleware//validate";
// import { CropSchema } from "../schemas/crop.schema";

// @controller("/crops")
// export class CropController {
//   constructor(@inject(TYPES.CropService) private cropService: CropService) {}

//   @httpGet("/")
//   public async getAllCrops(req: Request, res: Response): Promise<void> {
//     const crops = await this.cropService.getAllCrops();
//     res.json(crops);
//   }

//   @httpGet("/:id")
//   public async getCropById(req: Request, res: Response): Promise<void> {
//     const crop = await this.cropService.getCropById(req.params.id);
//     if (crop) {
//       res.json(crop);
//     } else {
//       res.status(404).send("Crop not found");
//     }
//   }

//   @httpPost("/")
//   public async createCrop(req: Request, res: Response): Promise<void> {
//     const cropData = req.body;
//     const crop = new CropSchema(cropData);
//     const errors = await validate(crop);
//     if (errors.length > 0) {
//       res.status(400).json(errors);
//       return;
//     }
//     const newCrop = await this.cropService.createCrop(cropData);
//     res.status(201).json(newCrop);
//   }

//   @httpPut("/:id")
//   public async updateCrop(req: Request, res: Response): Promise<void> {
//     const cropData = req.body;
//     const updatedCrop = await this.cropService.updateCrop(
//       req.params.id,
//       cropData
//     );
//     if (updatedCrop) {
//       res.json(updatedCrop);
//     } else {
//       res.status(404).send("Crop not found");
//     }
//   }

//   @httpDelete("/:id")
//   public async deleteCrop(req: Request, res: Response): Promise<void> {
//     const deleted = await this.cropService.deleteCrop(req.params.id);
//     if (deleted) {
//       res.status(204).send();
//     } else {
//       res.status(404).send("Crop not found");
//     }
//   }
// }
