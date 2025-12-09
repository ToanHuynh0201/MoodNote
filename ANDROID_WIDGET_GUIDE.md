# Hướng dẫn tạo Android Widget Module cho MoodNote

## Tổng quan
Tài liệu này hướng dẫn cách tạo một Android Home Screen Widget cơ bản cho ứng dụng MoodNote (React Native + Expo). Widget sẽ được viết bằng Kotlin và tích hợp với React Native thông qua Native Module.

## Kiến trúc tổng quan

**Các thành phần chính:**
1. **AppWidgetProvider** - Class Kotlin xử lý lifecycle của widget
2. **Widget Layout XML** - Định nghĩa giao diện widget
3. **Widget Info XML** - Metadata của widget (kích thước, tần suất cập nhật, v.v.)
4. **Native Module** (tùy chọn) - Cầu nối giữa React Native và widget
5. **SharedPreferences** - Lưu trữ và chia sẻ dữ liệu

---

## Bước 1: Cấu trúc file cần tạo

### 1.1 Widget Provider Class
**File:** `android/app/src/main/java/com/toanhuynh0201/MoodNote/MoodWidgetProvider.kt`
- Xử lý logic chính của widget
- Nhận broadcast updates
- Cập nhật UI widget

### 1.2 Widget Layout
**File:** `android/app/src/main/res/layout/widget_mood_layout.xml`
- Định nghĩa giao diện người dùng
- Chỉ sử dụng các view được RemoteViews hỗ trợ

### 1.3 Widget Metadata
**File:** `android/app/src/main/res/xml/widget_info.xml`
- Cấu hình thuộc tính widget cho Android system

### 1.4 Widget Background
**File:** `android/app/src/main/res/drawable/widget_background.xml`
- Background shape cho widget

### 1.5 Native Module (Tùy chọn - để tích hợp với React Native)
**Files:**
- `android/app/src/main/java/com/toanhuynh0201/MoodNote/WidgetModule.kt`
- `android/app/src/main/java/com/toanhuynh0201/MoodNote/WidgetPackage.kt`

---

## Bước 2: Tạo AppWidgetProvider

**File:** `MoodWidgetProvider.kt`

```kotlin
package com.toanhuynh0201.MoodNote

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews
import android.content.Intent
import android.app.PendingIntent

class MoodWidgetProvider : AppWidgetProvider() {

    // Được gọi khi widget được cập nhật
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    // Được gọi khi widget đầu tiên được tạo
    override fun onEnabled(context: Context) {
        // Khởi tạo resources nếu cần
    }

    // Được gọi khi widget cuối cùng bị xóa
    override fun onDisabled(context: Context) {
        // Dọn dẹp resources
    }
}

private fun updateAppWidget(
    context: Context,
    appWidgetManager: AppWidgetManager,
    appWidgetId: Int
) {
    // Tạo RemoteViews
    val views = RemoteViews(context.packageName, R.layout.widget_mood_layout)

    // Đọc dữ liệu từ SharedPreferences
    val prefs = context.getSharedPreferences("WidgetPrefs", Context.MODE_PRIVATE)
    val moodText = prefs.getString("lastMood", "Hôm nay bạn thế nào?")

    // Cập nhật nội dung widget
    views.setTextViewText(R.id.widget_mood_text, moodText)

    // Tạo PendingIntent để mở app khi click
    val intent = Intent(context, MainActivity::class.java)
    val pendingIntent = PendingIntent.getActivity(
        context,
        0,
        intent,
        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
    )
    views.setOnClickPendingIntent(R.id.widget_layout_root, pendingIntent)

    // Áp dụng cập nhật
    appWidgetManager.updateAppWidget(appWidgetId, views)
}
```

**Giải thích các method quan trọng:**
- `onUpdate()`: Được gọi định kỳ theo `updatePeriodMillis` (tối thiểu 30 phút)
- `onEnabled()`: Được gọi khi widget đầu tiên được đặt trên màn hình
- `onDisabled()`: Được gọi khi widget cuối cùng bị xóa
- `updateAppWidget()`: Logic cập nhật giao diện widget

---

## Bước 3: Tạo Widget Layout

**File:** `android/app/src/main/res/layout/widget_mood_layout.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/widget_layout_root"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    android:background="@drawable/widget_background">

    <TextView
        android:id="@+id/widget_title"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="MoodNote"
        android:textSize="18sp"
        android:textColor="#333333"
        android:textStyle="bold" />

    <TextView
        android:id="@+id/widget_mood_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Hôm nay bạn thế nào?"
        android:textSize="14sp"
        android:textColor="#666666"
        android:layout_marginTop="8dp" />

    <ImageView
        android:id="@+id/widget_mood_icon"
        android:layout_width="48dp"
        android:layout_height="48dp"
        android:layout_gravity="center"
        android:layout_marginTop="12dp"
        android:src="@mipmap/ic_launcher" />
</LinearLayout>
```

**Lưu ý:** RemoteViews chỉ hỗ trợ một số view giới hạn:
- **Layouts:** FrameLayout, LinearLayout, RelativeLayout, GridLayout
- **Widgets:** TextView, ImageView, Button, ImageButton, ProgressBar, v.v.

---

## Bước 4: Tạo Widget Background

**File:** `android/app/src/main/res/drawable/widget_background.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="#FFFFFF" />
    <corners android:radius="16dp" />
    <stroke android:width="1dp" android:color="#DDDDDD" />
</shape>
```

---

## Bước 5: Tạo Widget Info XML

**Tạo thư mục:** `android/app/src/main/res/xml/` (nếu chưa có)

**File:** `android/app/src/main/res/xml/widget_info.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="250dp"
    android:minHeight="110dp"
    android:targetCellWidth="4"
    android:targetCellHeight="2"
    android:updatePeriodMillis="1800000"
    android:initialLayout="@layout/widget_mood_layout"
    android:resizeMode="horizontal|vertical"
    android:widgetCategory="home_screen"
    android:description="@string/widget_description">
</appwidget-provider>
```

**Giải thích các thuộc tính:**
- `minWidth/minHeight`: Kích thước tối thiểu (dp)
- `targetCellWidth/Height`: Kích thước theo grid cell (Android 12+)
- `updatePeriodMillis`: Tần suất cập nhật tự động (tối thiểu 30 phút = 1800000ms)
- `resizeMode`: Cho phép thay đổi kích thước (horizontal, vertical, hoặc cả hai)
- `widgetCategory`: Hiển thị trên màn hình chính (home_screen)

---

## Bước 6: Đăng ký Widget trong AndroidManifest.xml

**File:** `android/app/src/main/AndroidManifest.xml`

Thêm đoạn code sau vào bên trong thẻ `<application>`:

```xml
<receiver
    android:name=".MoodWidgetProvider"
    android:exported="true"
    android:label="MoodNote Widget">
    <intent-filter>
        <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
    </intent-filter>
    <meta-data
        android:name="android.appwidget.provider"
        android:resource="@xml/widget_info" />
</receiver>
```

**Thêm string resource** vào `android/app/src/main/res/values/strings.xml`:

```xml
<string name="widget_description">Truy cập nhanh ghi chú tâm trạng</string>
```

---

## Bước 7: Cập nhật nội dung Widget

### 7.1 Sử dụng RemoteViews

Không thể truy cập trực tiếp view trong widget, phải dùng RemoteViews methods:

```kotlin
// Cập nhật text
views.setTextViewText(R.id.widget_mood_text, "Text mới")

// Cập nhật image từ drawable
views.setImageViewResource(R.id.widget_mood_icon, R.drawable.ic_mood_happy)

// Hiện/ẩn view
views.setViewVisibility(R.id.widget_mood_icon, View.VISIBLE)

// Đổi màu text
views.setTextColor(R.id.widget_mood_text, Color.parseColor("#333333"))
```

### 7.2 Xử lý Click Events

```kotlin
// Mở app khi click vào widget
val intent = Intent(context, MainActivity::class.java).apply {
    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
}

val pendingIntent = PendingIntent.getActivity(
    context,
    0,
    intent,
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
)

views.setOnClickPendingIntent(R.id.widget_layout_root, pendingIntent)
```

### 7.3 Deep Link đến màn hình cụ thể

```kotlin
// Sử dụng URI scheme "moodnote" đã có sẵn
val deepLinkUri = Uri.parse("moodnote://add-note")
val intent = Intent(Intent.ACTION_VIEW, deepLinkUri).apply {
    flags = Intent.FLAG_ACTIVITY_NEW_TASK
}

val pendingIntent = PendingIntent.getActivity(
    context,
    0,
    intent,
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
)
```

---

## Bước 8: Tích hợp với React Native (Tùy chọn)

### 8.1 Tạo Native Module

**File:** `android/app/src/main/java/com/toanhuynh0201/MoodNote/WidgetModule.kt`

```kotlin
package com.toanhuynh0201.MoodNote

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = WidgetModule.NAME)
class WidgetModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "WidgetModule"
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun updateWidgetData(mood: String, emoji: String) {
        val context = reactApplicationContext

        // Lưu vào SharedPreferences
        val prefs = context.getSharedPreferences("WidgetPrefs", Context.MODE_PRIVATE)
        prefs.edit().apply {
            putString("lastMood", mood)
            putString("lastMoodEmoji", emoji)
            apply()
        }

        // Trigger cập nhật widget
        updateWidget(context)
    }

    private fun updateWidget(context: Context) {
        val intent = Intent(context, MoodWidgetProvider::class.java).apply {
            action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
        }

        val appWidgetManager = AppWidgetManager.getInstance(context)
        val appWidgetIds = appWidgetManager.getAppWidgetIds(
            ComponentName(context, MoodWidgetProvider::class.java)
        )

        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds)
        context.sendBroadcast(intent)
    }
}
```

### 8.2 Tạo Package

**File:** `android/app/src/main/java/com/toanhuynh0201/MoodNote/WidgetPackage.kt`

```kotlin
package com.toanhuynh0201.MoodNote

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class WidgetPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(WidgetModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
```

### 8.3 Đăng ký Package trong MainApplication.kt

**File:** `android/app/src/main/java/com/toanhuynh0201/MoodNote/MainApplication.kt`

Sửa method `getPackages()`:

```kotlin
override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply {
        // Thêm custom package
        add(WidgetPackage())
    }
```

### 8.4 Sử dụng từ React Native

**Tạo file:** `modules/WidgetModule.ts`

```typescript
import { NativeModules } from 'react-native';

interface WidgetModuleInterface {
  updateWidgetData(mood: string, emoji: string): void;
}

const { WidgetModule } = NativeModules;

export default WidgetModule as WidgetModuleInterface;
```

**Sử dụng trong code:**

```typescript
import WidgetModule from './modules/WidgetModule';

// Khi user lưu mood
const handleSaveMood = (mood: string, emoji: string) => {
  // Lưu vào database/state
  // ...

  // Cập nhật widget
  WidgetModule.updateWidgetData(mood, emoji);
};
```

---

## Bước 9: Build và Test

### 9.1 Build app

```bash
cd android
./gradlew assembleDebug
```

Hoặc:

```bash
npx expo run:android
```

### 9.2 Thêm Widget lên màn hình

1. Nhấn giữ vào màn hình chính
2. Chọn "Widgets"
3. Tìm "MoodNote Widget"
4. Kéo widget vào vị trí mong muốn

### 9.3 Debug

```bash
adb logcat | grep MoodWidget
```

Thêm log vào code:

```kotlin
import android.util.Log

private const val TAG = "MoodWidget"

override fun onUpdate(...) {
    Log.d(TAG, "Widget đang được cập nhật")
}
```

---

## Các vấn đề thường gặp

### Widget không xuất hiện trong danh sách
- Kiểm tra đăng ký trong AndroidManifest.xml
- Đảm bảo `android:exported="true"`
- Kiểm tra file widget_info.xml có tồn tại trong res/xml/

### Widget hiển thị "Problem loading widget"
- Kiểm tra layout XML có sử dụng view không được hỗ trợ
- Kiểm tra resource IDs có đúng không
- Xem log để tìm lỗi

### Widget không cập nhật
- Kiểm tra PendingIntent flags (dùng FLAG_IMMUTABLE trên Android 12+)
- Kiểm tra quyền truy cập SharedPreferences
- Đảm bảo broadcast receiver được đăng ký đúng

### Click không hoạt động
- Kiểm tra PendingIntent flags
- Kiểm tra intent filters trong AndroidManifest
- Đảm bảo context đúng khi tạo intents

---

## Checklist triển khai

### Phase 1: Widget cơ bản
- [ ] Tạo `MoodWidgetProvider.kt`
- [ ] Tạo `widget_mood_layout.xml`
- [ ] Tạo `widget_info.xml`
- [ ] Tạo `widget_background.xml`
- [ ] Đăng ký trong `AndroidManifest.xml`
- [ ] Thêm string resources
- [ ] Test widget xuất hiện trong picker
- [ ] Test widget hiển thị trên màn hình

### Phase 2: Tương tác
- [ ] Implement `updateAppWidget()` method
- [ ] Thêm click handlers
- [ ] Test mở app khi click
- [ ] Test deep linking (nếu có)

### Phase 3: Tích hợp dữ liệu
- [ ] Tạo `WidgetModule.kt`
- [ ] Tạo `WidgetPackage.kt`
- [ ] Đăng ký trong `MainApplication.kt`
- [ ] Tạo TypeScript interface
- [ ] Test data flow từ RN sang widget
- [ ] Test cập nhật widget với dữ liệu thực

---

## Best Practices

### Hiệu năng
- Giảm thiểu số lần cập nhật widget (tiết kiệm pin)
- Sử dụng layout đơn giản
- Tránh các thao tác nặng trong onUpdate()

### Trải nghiệm người dùng
- Cung cấp preview image rõ ràng
- Hỗ trợ nhiều kích thước
- Xử lý trường hợp không có dữ liệu

### Bảo mật
- Sử dụng FLAG_IMMUTABLE cho PendingIntents (Android 12+)
- Validate dữ liệu từ SharedPreferences
- Không hiển thị dữ liệu nhạy cảm trên widget

---

## Tài liệu tham khảo

- [App Widgets Overview](https://developer.android.com/guide/topics/appwidgets/overview)
- [RemoteViews](https://developer.android.com/reference/android/widget/RemoteViews)
- [AppWidgetProvider](https://developer.android.com/reference/android/appwidget/AppWidgetProvider)
- [React Native Native Modules](https://reactnative.dev/docs/native-modules-android)

---

## Các file quan trọng nhất

1. **MoodWidgetProvider.kt** - Logic core của widget
2. **widget_info.xml** - Cấu hình metadata
3. **widget_mood_layout.xml** - Giao diện UI
4. **AndroidManifest.xml** - Đăng ký widget
5. **WidgetModule.kt** - Cầu nối RN và native (nếu cần)
