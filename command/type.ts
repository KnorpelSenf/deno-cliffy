import type { Command } from "./command.ts";
import { TypeOrTypeHandler } from "./types.ts";
import type {
  ArgumentValue,
  CompleteHandlerResult,
  TypeValues,
} from "./types.ts";

/**
 * Base class for custom types.
 *
 * **Custom type example:**
 * ```
 * export class ColorType extends Type<string> {
 *   public parse({ label, name, value, type }: ITypeInfo): string {
 *     if (["red", "blue"].includes(value)) {
 *       trow new Error(
 *         `${label} "${name}" must be of type "${type}", but got "${value}".` +
 *         "Valid colors are: red, blue"
 *       );
 *     }
 *     return value;
 *   }
 *
 *   public complete(): string[] {
 *     return ["red", "blue"];
 *   }
 * }
 * ```
 */
export abstract class Type<TType extends string, TReturn> {
  public abstract parse(type: ArgumentValue<TType>): TReturn;

  /**
   * Returns values displayed in help text. If no complete method is provided,
   * these values are also used for shell completions.
   */
  public values?(
    cmd: Command,
    parent?: Command,
  ): TypeValues;

  /**
   * Returns shell completion values. If no complete method is provided,
   * values from the values method are used.
   */
  public complete?(
    cmd: Command,
    parent?: Command,
  ): CompleteHandlerResult;
}

// deno-lint-ignore no-namespace
export namespace Type {
  export type infer<TTypeHandler, TDefaultValue = TTypeHandler> =
    // deno-lint-ignore no-explicit-any
    TTypeHandler extends TypeOrTypeHandler<any, infer Value> ? Value
      : TDefaultValue;
}
