// charAt(0) giúp lấy ký tự ở vị trí 0 trong chuỗi
// toUpperCase() giúp viết hoa
// slice(1) giúp lấy ra phần còn lại trong chuỗi bắt đầu từ vị trí thứ 1


// Hàm viết hoa chữ cái đầu trong chuỗi
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}