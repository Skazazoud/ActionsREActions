package com.example.sifdinehaddou1.area

import android.telecom.Call
import retrofit2.Callback
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.POST
import retrofit2.http.Query

interface routes {

    @POST("api/signup")
    fun userRegister(
        @Query("email") email :String,
        @Query("password") password :String,
        @Query("phone") phone :String
    ): retrofit2.Call<UserRegister>

    @POST("api/login")
    fun UserLogin(
        @Query("email") email: String,
        @Query("password") password: String
    ): retrofit2.Call<UserLogin>

    companion object {
        fun create(): routes {
            val retrofit = Retrofit.Builder()
                .addConverterFactory(MoshiConverterFactory.create())
                .baseUrl("http://10.109.253.244:8080/")
                .build()
            return retrofit.create(routes::class.java)
        }
    }
}