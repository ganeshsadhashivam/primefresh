import { TypeOf, z } from 'zod';
import { Status } from '../utils/status.enum';

// Define Zod schema for Drivers
export const driverSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters").optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  status: z.nativeEnum(Status).default(Status.PENDING),
  vehicleType: z.string().optional(),
  vehicleNo: z.string().optional(),
});


export type UpdateDriverInput = TypeOf<typeof driverSchema>;