// import {
//     Expense,
//     ExpenseCategory,
//     Income,
//     IncomeCategory,
// } from "../../entities";
// import getAdminUserId from "../../util/getAdminUserId";
// import { getConnection } from "typeorm";
// import { EntityNotFoundError } from "./Errors";
// import { formatYupError } from "./formatYupError";
// import { FieldError } from "./FieldError";

// type EntityConstructor =
//     | typeof Expense
//     | typeof ExpenseCategory
//     | typeof Income
//     | typeof IncomeCategory;

// type EntityInstance = Expense | ExpenseCategory | Income | IncomeCategory;
// const entities: { [key: string]: EntityConstructor } = {
//     Expense,
//     ExpenseCategory,
//     Income,
//     IncomeCategory,
// };
// // type EntityInstance = Expense | ExpenseCategory | Income | IncomeCategory;
// // type EntityConstructor = typeof Project | typeof User | typeof Issue | typeof Comment;
// // type EntityInstance = Project | User | Issue | Comment;

// export const findEntityOrThrow = async <T extends EntityConstructor>(
//     Constructor: T,
//     id: number | string,
//     conditions?: { key: string; value: string; eq: boolean }[]
// ): Promise<InstanceType<T>> => {
//     let entity = await getConnection()
//         .createQueryBuilder()
//         .select("entity")
//         .from(Constructor, "entity")
//         .where("id = :pid", { pid: id })
//         .getRawOne();

//     if (!entity) {
//         throw new Error(EntityNotFoundError(Constructor.name));
//     }
//     if (conditions && conditions?.length > 0) {
//         let validConditions = conditions?.filter(condition => {
//             return condition.eq
//                 ? entity[`entity_${condition.key}`].toString() ===
//                       condition.value
//                 : entity[`entity_${condition.key}`].toString() !==
//                       condition.value;
//         });
//         if (validConditions?.length === conditions?.length) {
//             throw new Error(EntityNotFoundError(Constructor.name));
//         }
//     }
//     entity = await Constructor.findOne(id);
//     return entity;
// };

// export const getCategories = async <
//     T extends typeof ExpenseCategory | typeof IncomeCategory
// >(
//     Constructor: T,
//     userId: number | string
// ): Promise<InstanceType<T>[]> => {
//     let adminUserId = await getAdminUserId();
//     return (await getConnection()
//         .createQueryBuilder()
//         .select("category")
//         .from(Constructor, "category")
//         .where('"userId" = :id1', { id1: userId })
//         .orWhere('"userId" = :id2', { id2: adminUserId })
//         .getMany()) as InstanceType<T>[];
// };

// export const getData = async <T extends typeof Expense | typeof Income>(
//     Constructor: T,
//     userId: number | string,
//     categoryId?: number | string | undefined,
//     orderBy?: "ASC" | "DESC" | undefined
// ): Promise<InstanceType<T>[]> => {
//     let query = await getConnection()
//             .createQueryBuilder()
//             .select("entities")
//             .from(Constructor, "entities")
//         .where('"entities"."userId" = :userId', { userId })

//     if (categoryId) {
//         query.andWhere('"entities"."categoryId" = :categoryId', { categoryId });
//     }
//     if (orderBy) {
//         query.orderBy('"entities"."date"', orderBy);
//     }
//     let data = await query.getMany()
//     return data as InstanceType<T>[];
// };

// export const validateAndSaveEntity = async <T extends EntityInstance>(
//     instance: T
// ): Promise<{ entity?: T, errors?: FieldError[]}> => {
//     const Constructor = entities[instance.constructor.name];
//     if ("validations" in Constructor) {
//         try {
//             await Constructor.validations.validate(instance, { abortEarly: false });
//         } catch (errors) {
//             return { errors: formatYupError(errors) };
//         }
//     }
//     return {
//         entity: await instance.save() as T
//     };
// };

// export const updateEntity = async <T extends EntityConstructor>(
//     Constructor: T,
//     id: number | string,
//     input: Partial<InstanceType<T>>
// ) => {
//     const instance = await findEntityOrThrow(Constructor, id);
//     Object.assign(instance, input);
//     return validateAndSaveEntity(instance);
// };

// export const createEntity = async <T extends EntityConstructor>(
//     Constructor: T,
//     input: Partial<InstanceType<T>>
// ) => {
//     const instance = Constructor.create(input);
//     return validateAndSaveEntity(instance as InstanceType<T>);
// };

// export const deleteEntity = async <T extends EntityConstructor>(
//     Constructor: T,
//     id: number | string
// ) => {
//     const instance = await findEntityOrThrow(Constructor, id);
//     instance.remove();
//     return instance;
// };
