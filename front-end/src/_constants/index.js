import selectLang from "../_helper/selectLang";

export const ENDPOINT = "http://localhost:8085";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const FAIL = "FAIL";
export const SUCCESS = "SUCCESS";

//Comfirm Payment Page

export const CHECKOUT = selectLang("Checkout", "เช็คเอาท์");
export const PAY = selectLang("Pay", "จ่าย");
export const CONFIRM = selectLang("Confirm", "ยืนยัน");
export const COMPLETE = selectLang("Complete", "เสร็จ");

export const COUNTDOWN_TEXT = selectLang(
  "Please complete registration within 15 minutes. After 15 minutes, the reservation we are holding will be released to others.",
  "กรุณาทำรายการให้เสร็จภายใน 15 นาที ถ้าเกิน 15 นาที เราจะปล่อยบัตรที่จองไว้ให้ท่านอื่น"
);
export const TOTAL = selectLang("Total", "รวม");
export const EVENT_NAME = selectLang("Event Name", "ชื่ออีเวนท์");
export const TICKET = selectLang("Ticket", "บัตร");
export const PRICE = selectLang("Price", "ราคา");
export const AMOUNT = selectLang("Amount", "จำนวน");

export const REVIEW_ORDER_SUMMARY = selectLang(
  "Review Order Summary",
  "สรุปคำสั่งซื้อ"
);
export const QUANTITY = selectLang("Quantity", "จำนวน");
export const SUBTOTAL = selectLang("Subtotal", "ยอดรวม");
export const GRANDTOTAL = selectLang("Grand Total", "ยอดรวมทั้งหมด");

export const CANCEL_ORDER = selectLang("Cancel Order", "ยกเลิกคำสั่งซื้อ");
export const CONFIRM_ORDER = selectLang("Confirm Order", "ยืนยันคำสั่งซื้อ");

export const TAG = selectLang("Tag", "แท็ก");
