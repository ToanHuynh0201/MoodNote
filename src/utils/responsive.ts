/**
 * @deprecated This file is DEPRECATED. Use @/utils/scaling instead.
 *
 * Migration guide:
 * - scale(size) → spacing(size) or s(size, 1)
 * - verticalScale(size) → spacing(size) or s(size, 1)
 * - moderateScale(size) → s(size) or fontSize(size)
 * - moderateVerticalScale(size) → spacing(size) or s(size, 1)
 *
 * The new system uses simple width-based scaling for portrait mobile only.
 * See @/constants/spacing for pre-defined spacing tokens.
 * See @/utils/scaling for the new simplified scaling API.
 */

import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

// Lấy kích thước màn hình
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Xác định cạnh ngắn nhất và dài nhất (Logic này giúp support cả xoay ngang/dọc cơ bản)
const [shortDimension, longDimension] =
	SCREEN_WIDTH < SCREEN_HEIGHT
		? [SCREEN_WIDTH, SCREEN_HEIGHT]
		: [SCREEN_HEIGHT, SCREEN_WIDTH];

// Kích thước chuẩn dựa trên Design (Ví dụ: iPhone X/11/12/13/14 Pro)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * @deprecated Use spacing(size) or s(size, { axis: 'x' }) from @/utils/scaling instead
 *
 * Scale theo chiều rộng (Width)
 * Dùng cho: paddingHorizontal, marginHorizontal, width, v.v.
 */
export const scale = (size: number) => {
	return Math.round(
		PixelRatio.roundToNearestPixel(
			(shortDimension / guidelineBaseWidth) * size,
		),
	);
};

/**
 * @deprecated Use spacing(size) or s(size, { axis: 'y' }) from @/utils/scaling instead
 *
 * Scale theo chiều cao (Height)
 * Dùng cho: paddingVertical, marginVertical, height, v.v.
 */
export const verticalScale = (size: number) => {
	return Math.round(
		PixelRatio.roundToNearestPixel(
			(longDimension / guidelineBaseHeight) * size,
		),
	);
};

/**
 * @deprecated Use s(size) or fontSize(size) from @/utils/scaling instead
 *
 * Scale có điều chỉnh (Moderate Scale) - QUAN TRỌNG NHẤT
 * Dùng cho: fontSize, borderRadius, iconSize
 * @param size Kích thước trong design
 * @param factor Hệ số điều chỉnh (default 0.5).
 * - 0: Không scale (giữ nguyên size).
 * - 1: Scale full theo màn hình (giống hàm scale ở trên).
 * - 0.5: Scale một nửa biên độ (Khuyên dùng cho Tablet).
 */
export const moderateScale = (size: number, factor = 0.5) => {
	// Tính toán độ chênh lệch giữa scale chuẩn và size gốc
	const step = scale(size) - size;
	// Cộng thêm một phần của độ chênh lệch đó
	return Math.round(PixelRatio.roundToNearestPixel(size + step * factor));
};

/**
 * @deprecated Rarely used. Use s(size, { axis: 'y', factor }) from @/utils/scaling if needed
 *
 * Scale chiều cao có điều chỉnh (Ít dùng hơn, nhưng hữu ích cho các khoảng cách dọc nhỏ)
 */
export const moderateVerticalScale = (size: number, factor = 0.5) => {
	const step = verticalScale(size) - size;
	return Math.round(PixelRatio.roundToNearestPixel(size + step * factor));
};

/**
 * Helper lấy chiều cao thanh trạng thái (StatusBar) và chiều cao an toàn
 * Hữu ích khi tính toán chiều cao màn hình trừ đi các phần hệ thống
 */
export const STATUS_BAR_HEIGHT = Platform.select({
	ios: shortDimension > 800 ? 47 : 20, // Xử lý tai thỏ cơ bản
	android: StatusBar.currentHeight,
	default: 0,
});
