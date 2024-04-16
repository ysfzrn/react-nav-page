package com.reactnavpage

import android.content.res.Resources
import kotlin.math.roundToInt

public fun dpToPx(dp: Double): Int {
  return (dp.roundToInt() * Resources.getSystem().displayMetrics.density).roundToInt()
    .toInt()
}
