package com.example.sifdinehaddou1.area

import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import kotlinx.android.synthetic.main.nav_header_main2.*
import retrofit2.Call
import retrofit2.Response

class SignupActivity : AppCompatActivity() {

    var _nameText: EditText? = null
    var _addressText: EditText? = null
    var _emailText: EditText? = null
    var _mobileText: EditText? = null
    var _passwordText: EditText? = null
    var _reEnterPasswordText: EditText? = null
    var _signupButton: Button? = null
    var _loginLink: TextView? = null

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(com.example.sifdinehaddou1.area.R.layout.activity_signup)

        _nameText = findViewById<EditText>(R.id.input_name)
        _emailText = findViewById<EditText>(R.id.input_email)
        _passwordText = findViewById<EditText>(R.id.input_password)
        _reEnterPasswordText = findViewById<EditText>(R.id.input_reEnterPassword)

        _signupButton = findViewById<Button>(R.id.btn_signup)
        _loginLink = findViewById<TextView>(R.id.link_login)

        _signupButton!!.setOnClickListener { signup() }

        _loginLink!!.setOnClickListener {
            startActivity(Intent(this@SignupActivity, LoginActivity::class.java))
            overridePendingTransition(com.example.sifdinehaddou1.area.R.anim.push_left_in,
                com.example.sifdinehaddou1.area.R.anim.push_left_out)
        }
    }

    fun signup() {
        Log.d(TAG, "Signup")

        if (!validate()) {
            onSignupFailed()
            return
        }

        Toast.makeText(this, "salut", Toast.LENGTH_LONG).show()

//        _signupButton!!.isEnabled = false


        val progressDialog = ProgressDialog(this@SignupActivity,
            com.example.sifdinehaddou1.area.R.style.AppTheme_Dark_Dialog)
        progressDialog.isIndeterminate = true
        progressDialog.setMessage("Creating Account...")
        progressDialog.show()



        val email = _emailText!!.text.toString()
        val password = _passwordText!!.text.toString()
        val phone = _mobileText!!.text.toString()

        _signupButton!!.setOnClickListener {
            val my_route = routes.create()
            val callinfo = my_route.userRegister(email, password, phone)
            callinfo.enqueue(object: retrofit2.Callback<UserRegister>{
                override fun onFailure(call: Call<UserRegister>, t: Throwable) {

                    onSignupFailed()

                }

                override fun onResponse(call: Call<UserRegister>, response: Response<UserRegister>) {
                    val body = response.body()
                    if (response.isSuccessful && body != null) {

                        android.os.Handler().postDelayed(
                            {

                                // On complete call either onSignupSuccess or onSignupFailed
                                // depending on success
                                onSignupSuccess()
                                // onSignupFailed();
                                progressDialog.dismiss()
                            }, 3000)

                    }
                    else
                        Toast.makeText(this@SignupActivity, "Probleme", Toast.LENGTH_LONG).show()
                }

            } )
        }

        // TODO: Implement your own signup logic here.


    }


    fun onSignupSuccess() {
        _signupButton!!.isEnabled = true
//        setResult(Activity.RESULT_OK, null)
//        finish()
        startActivity(Intent(this@SignupActivity, LoginActivity::class.java))
//        finish()
    }

    fun onSignupFailed() {
        Toast.makeText(baseContext, "Login failed", Toast.LENGTH_LONG).show()

        _signupButton!!.isEnabled = true
    }

    fun validate(): Boolean {
        var valid = true

        val name = _nameText!!.text.toString()
        val email = _emailText!!.text.toString()
        val mobile = _mobileText!!.text.toString()
        val password = _passwordText!!.text.toString()
        val reEnterPassword = _reEnterPasswordText!!.text.toString()

        if (name.isEmpty() || name.length < 3) {
            _nameText!!.error = "at least 3 characters"
            valid = false
        } else {
            _nameText!!.error = null
        }


        if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            _emailText!!.error = "enter a valid email address"
            valid = false
        } else {
            _emailText!!.error = null
        }

        if (mobile.isEmpty() || mobile.length != 10) {
            _mobileText!!.error = "Enter Valid Mobile Number"
            valid = false
        } else {
            _mobileText!!.error = null
        }

        if (password.isEmpty() || password.length < 4 || password.length > 10) {
            _passwordText!!.error = "between 4 and 10 alphanumeric characters"
            valid = false
        } else {
            _passwordText!!.error = null
        }

        if (reEnterPassword.isEmpty() || reEnterPassword.length < 4 || reEnterPassword.length > 10 || reEnterPassword != password) {
            _reEnterPasswordText!!.error = "Password Do not match"
            valid = false
        } else {
            _reEnterPasswordText!!.error = null
        }

        return valid
    }

    companion object {
        private val TAG = "SignupActivity"
    }
}