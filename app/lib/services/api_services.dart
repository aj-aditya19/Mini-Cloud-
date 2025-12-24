import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class ApiService {
  // Base URL for different platforms
  static String get baseUrl {
    if (Platform.isAndroid) {
      // Android Emulator
      return "http://10.0.2.2:3000/api";
    } else if (Platform.isWindows) {
      // Windows Desktop
      return "http://localhost:3000/api";
    } else if (Platform.isLinux || Platform.isMacOS) {
      // Linux or MacOS
      return "http://localhost:3000/api";
    } else {
      // Fallback for web (you may need your PC IP if accessing from another device)
      return "http://localhost:3000/api";
    }
  }

  // ---------------- LOGIN ----------------
  static Future<Map<String, dynamic>> login(
    String email,
    String password,
  ) async {
    try {
      var response = await http.post(
        Uri.parse('${baseUrl}/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      // print("Login Status: ${response.statusCode}");
      // print("Login Body: ${response.body}");
      // print("Response length: ${response.body.length}"); // safe

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return {
          'success': false,
          'message': 'Server error ${response.statusCode}',
        };
      }
    } catch (e) {
      // print("Login error: $e");
      return {'success': false, 'message': e.toString()};
    }
  }

  // ---------------- REGISTER ----------------
  static Future<Map<String, dynamic>> register(
    String name,
    String email,
    String password,
  ) async {
    try {
      var response = await http.post(
        Uri.parse('${baseUrl}/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'name': name, 'email': email, 'password': password}),
      );

      // print("Register Status: ${response.statusCode}");
      // print("Register Body: ${response.body}");

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return {
          'success': false,
          'message': 'Server error ${response.statusCode}',
        };
      }
    } catch (e) {
      // print("Register error: $e");
      return {'success': false, 'message': e.toString()};
    }
  }

  // ---------------- FILE UPLOAD ----------------
  static Future<Map<String, dynamic>> uploadFile(File file) async {
    try {
      var request = http.MultipartRequest(
        'POST',
        Uri.parse('${baseUrl}/upload'),
      );

      request.files.add(await http.MultipartFile.fromPath('file', file.path));

      var streamedResponse = await request.send();
      var response = await http.Response.fromStream(streamedResponse);

      // print("Upload Status: ${response.statusCode}");
      // print("Upload Body: ${response.body}");

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return {
          'success': false,
          'message': 'Server error ${response.statusCode}',
        };
      }
    } catch (e) {
      // print("Upload error: $e");
      return {'success': false, 'message': e.toString()};
    }
  }

  static Future<Map<String, dynamic>> fetchDocuments() async {
    try {
      var response = await http.get(Uri.parse('${baseUrl}/alldocuments'));
      if (response.statusCode == 200) return jsonDecode(response.body);
      return {
        'success': false,
        'message': 'Server error ${response.statusCode}',
      };
    } catch (e) {
      return {'success': false, 'message': e.toString()};
    }
  }
}
