# ThemeContext - Quản lý Dark Mode/Light Mode

## Mô tả
ThemeContext cung cấp một cách dễ dàng để quản lý theme (dark/light mode) trong ứng dụng React Native. Context này tự động theo dõi system color scheme và cho phép người dùng override với preference của họ.

## Tính năng
- ✅ Hỗ trợ 3 chế độ: `light`, `dark`, `auto`
- ✅ Tự động theo dõi system color scheme khi ở chế độ `auto`
- ✅ Toggle dễ dàng giữa light và dark mode
- ✅ TypeScript support đầy đủ
- ✅ Hook `useTheme()` để truy cập theme ở bất kỳ đâu trong app

## Cách sử dụng

### 1. Provider đã được setup tại root level
ThemeProvider đã được wrap tại `app/_layout.tsx`:

```tsx
import { ThemeProvider } from "@/src/contexts";

export default function RootLayout() {
  return (
    <ThemeProvider defaultMode="auto">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 2. Sử dụng hook `useTheme()` trong components

```tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/contexts";

export default function MyComponent() {
  const { theme, isDark, toggleTheme, themeMode, setThemeMode } = useTheme();

  return (
    <View style={{ backgroundColor: theme.background.primary }}>
      <Text style={{ color: theme.text.primary }}>
        Current mode: {themeMode}
      </Text>
      <Text style={{ color: theme.text.primary }}>
        Is dark: {isDark ? "Yes" : "No"}
      </Text>

      {/* Toggle button */}
      <TouchableOpacity onPress={toggleTheme}>
        <Text style={{ color: theme.primary }}>Toggle Theme</Text>
      </TouchableOpacity>

      {/* Set specific mode */}
      <TouchableOpacity onPress={() => setThemeMode("light")}>
        <Text style={{ color: theme.primary }}>Light Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setThemeMode("dark")}>
        <Text style={{ color: theme.primary }}>Dark Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setThemeMode("auto")}>
        <Text style={{ color: theme.primary }}>Auto Mode</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### 3. Truy cập theme colors

```tsx
const { theme } = useTheme();

// Background colors
theme.background.primary    // Màu nền chính
theme.background.secondary  // Màu nền phụ
theme.background.tertiary   // Màu nền tertiary
theme.background.elevated   // Màu nền elevated

// Text colors
theme.text.primary          // Màu chữ chính
theme.text.secondary        // Màu chữ phụ
theme.text.tertiary         // Màu chữ tertiary
theme.text.disabled         // Màu chữ disabled
theme.text.inverse          // Màu chữ inverse

// Brand colors
theme.primary               // Màu primary
theme.primaryLight          // Màu primary nhạt
theme.primaryDark           // Màu primary đậm

// Emotion colors
theme.emotions.happy        // Vui vẻ
theme.emotions.sad          // Buồn
theme.emotions.calm         // Bình thản
// ... và nhiều emotions khác

// Status colors
theme.success               // Thành công
theme.warning               // Cảnh báo
theme.error                 // Lỗi
theme.info                  // Thông tin

// Và nhiều colors khác...
```

## API Reference

### ThemeProvider Props
```tsx
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode; // "light" | "dark" | "auto" (default: "auto")
}
```

### useTheme() Returns
```tsx
interface ThemeContextType {
  theme: ThemeColors;           // Object chứa tất cả theme colors
  themeMode: ThemeMode;         // Mode hiện tại: "light" | "dark" | "auto"
  isDark: boolean;              // True nếu đang dùng dark theme
  setThemeMode: (mode: ThemeMode) => void;  // Set mode cụ thể
  toggleTheme: () => void;      // Toggle giữa light/dark
}
```

### toggleTheme() behavior
- Nếu đang ở `auto`: chuyển sang mode ngược lại với system (dark → light hoặc light → dark)
- Nếu đang ở `light`: chuyển sang `dark`
- Nếu đang ở `dark`: chuyển sang `light`

## Ví dụ Settings Screen

```tsx
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "@/src/contexts";

export default function SettingsScreen() {
  const { theme, isDark, themeMode, setThemeMode } = useTheme();

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.background.primary,
      padding: 20
    }}>
      <Text style={{
        color: theme.text.primary,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20
      }}>
        Theme Settings
      </Text>

      {/* Auto mode */}
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: themeMode === "auto"
            ? theme.primary
            : theme.surface.secondary,
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => setThemeMode("auto")}
      >
        <Text style={{
          color: themeMode === "auto"
            ? theme.text.inverse
            : theme.text.primary
        }}>
          Auto (Follow System)
        </Text>
      </TouchableOpacity>

      {/* Light mode */}
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: themeMode === "light"
            ? theme.primary
            : theme.surface.secondary,
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => setThemeMode("light")}
      >
        <Text style={{
          color: themeMode === "light"
            ? theme.text.inverse
            : theme.text.primary
        }}>
          Light Mode
        </Text>
      </TouchableOpacity>

      {/* Dark mode */}
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: themeMode === "dark"
            ? theme.primary
            : theme.surface.secondary,
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => setThemeMode("dark")}
      >
        <Text style={{
          color: themeMode === "dark"
            ? theme.text.inverse
            : theme.text.primary
        }}>
          Dark Mode
        </Text>
      </TouchableOpacity>

      <Text style={{
        color: theme.text.secondary,
        marginTop: 20
      }}>
        Current: {themeMode} {isDark && "(Dark)"}
      </Text>
    </View>
  );
}
```

## Lưu ý
- Theme sẽ tự động update khi system color scheme thay đổi (nếu đang ở chế độ `auto`)
- Tất cả colors đã được định nghĩa sẵn trong `src/constants/theme.ts`
- Light theme và dark theme có bộ colors khác nhau để đảm bảo contrast tốt
