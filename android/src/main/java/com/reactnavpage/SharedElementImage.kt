package com.reactnavpage

import android.annotation.SuppressLint
import android.content.Context
import android.net.Uri
import android.util.AttributeSet
import android.util.Log
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.drawee.controller.BaseControllerListener
import com.facebook.drawee.drawable.ScalingUtils
import com.facebook.drawee.view.SimpleDraweeView
import com.facebook.imagepipeline.image.ImageInfo
import com.facebook.react.bridge.ReadableMap


class SharedElementImage : SimpleDraweeView {
  constructor(context: Context) : super(context)
  constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
  constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
    context,
    attrs,
    defStyleAttr
  )


  init {
    Fresco.initialize(context)
  }

  @SuppressLint("DiscouragedApi")
  fun setSource(source: ReadableMap) {
    val uriString = source.getString("uri");
    val local = source.getBoolean("local");

    if(BuildConfig.DEBUG){
      val uriAddress = Uri.parse(uriString)
      val controller = Fresco.newDraweeControllerBuilder()
        .setUri(uriAddress)
        .setControllerListener(controlListener)
        .build();

      this.controller = controller;

    }else{
      if(local){

        val resourceId: Int =  context.resources.getIdentifier(uriString, "drawable", context.packageName)

        val controller = Fresco.newDraweeControllerBuilder()
          .setUri(Uri.parse("res:/$resourceId"))
          .setControllerListener(controlListener)
          .build();

        this.controller = controller;

      }else{
        val uriAddress = Uri.parse(uriString)

        val controller = Fresco.newDraweeControllerBuilder()
          .setUri(uriAddress)
          .setControllerListener(controlListener)
          .build();

        this.controller = controller;
      }

    }
    this.hierarchy.actualImageScaleType = ScalingUtils.ScaleType.FIT_CENTER
  }


  private val controlListener = object : BaseControllerListener<ImageInfo>() {}
}

