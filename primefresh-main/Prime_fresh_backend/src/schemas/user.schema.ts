import { array, object, string, TypeOf, z } from "zod";

export const addressSchema = object({
  id: z.string().uuid().optional(),

  street: string().optional(),
  city: string().optional(),
  state: string().optional(),
  postalCode: string().optional(),
  country: string().optional(),
});
// Helper function to parse ISO date strings into Date objects

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "firstName is required",
    }),
    lastName: string({
      required_error: "lastName is required",
    }),
    username: string({
      required_error: "username is required",
    }),
    phoneNumber: string({
      required_error: "phoneNumber is required",
    }),
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    addresses: array(addressSchema),
    //dateOfBirth: z.date().optional(),
    joiningDate: z.string().date(),
    roleId: string({ required_error: "Role ID is required" }),
  }),
});

const params = {
  params: object({
    id: string().uuid(),
  }),
};


// Schema for validating user ID parameter
export const UserIdSchema = object({
  ...params,
});

// Schema for updating user information
export const UpdateUserSchema = object({
  ...params,
  body: object({
    firstName: string({
      required_error: "First name is required",
    }).optional(),
    lastName: string({
      required_error: "Last name is required",
    }).optional(),
    username: string({
      required_error: "Username is required",
    }).optional(),
    phoneNumber: string({
      required_error: "Phone number is required",
    }).optional(),
    email: string({
      required_error: "Email address is required",
    })
      .email("Invalid email address")
      .optional(),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters")
      .optional(),
    address: array(addressSchema).optional(),
    joiningDate: z
      .string()
      .transform((value) => new Date(value))
      .optional(),
      roleId: string().uuid().optional(),
  }),
});



export const userSchema =   // Ensure params is correctly defined and compatible with zod schema
object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    username: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    employeeId: z.string().optional(),
    joiningDate: z.string().refine(date => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }).optional(),
    relocationDate:z.string().refine(date => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }).optional(), 
    relocationPlace:z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    roleId: z.string().uuid("Invalid Role ID format").optional(),
  })

export type UpdateUserInput = TypeOf<typeof userSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type GetUserInput = TypeOf<typeof UserIdSchema>["params"];
export type UpdateUserInputa = TypeOf<typeof UpdateUserSchema>;

