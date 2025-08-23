import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "temperature", // Tên pipe
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  /**
   *
   * @param value: giá trị mà bạn muốn chuyển đổi
   * @param args: cấu hình các tùy chọn (Celsius, Fahrenheit)
   * @returns: số nhiệt độ đã chuyển đổi
   * @example: {{ 100 | temperature: 'Celsius' }}
   */
  transform(
    value: string | number, // Giá trị nhiệt độ
    inputType: "C" | "F", // Kiểu đầu vào (Celsius hoặc Fahrenheit)
    outputType: "C" | "F" // Kiểu đầu ra (Celsius hoặc Fahrenheit)
  ): string {
    let temp: number;
    if (typeof value === "string") {
      temp = parseFloat(value);
    } else {
      temp = value;
    }

    let symbol: string;
    let result: number;

    if (inputType === "C" && outputType === "F") {
      result = (temp * 9) / 5 + 32;
    } else if (inputType === "F" && outputType === "C") {
      result = ((temp - 32) * 5) / 9;
    } else {
      result = temp;
    }

    if (!outputType) {
      symbol = inputType === "C" ? "C" : "F";
    } else {
      symbol = outputType === "C" ? "C" : "F";
    }
    return `${temp}°${symbol}`;
  }
}
