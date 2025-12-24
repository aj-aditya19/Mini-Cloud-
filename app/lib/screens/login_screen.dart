import 'package:app/screens/error_screen.dart';
import 'package:app/screens/register_screen.dart';
import 'package:app/screens/upload_screen.dart';
import 'package:app/services/api_services.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  bool loading = false;

  void login() async {
    setState(() {
      loading = true;
    });
    final res = await ApiService.login(
      emailController.text,
      passwordController.text,
    );
    setState(() {
      loading = false;
    });

    if (res['success'] == false) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => ErrorScreen()),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => UploadScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: emailController,
              decoration: InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: passwordController,
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: login,
              child: loading
                  ? CircularProgressIndicator(color: Colors.white)
                  : Text("Login"),
            ),
            TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => RegisterScreen()),
                );
              },
              child: Text("New User? Register"),
            ),
          ],
        ),
      ),
    );
  }
}
