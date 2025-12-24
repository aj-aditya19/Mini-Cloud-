import 'dart:io';
import 'package:app/screens/document_dart.dart';
import 'package:app/services/api_services.dart';
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';

class UploadScreen extends StatefulWidget {
  const UploadScreen({super.key});

  @override
  State<UploadScreen> createState() => _UploadScreenState();
}

class _UploadScreenState extends State<UploadScreen> {
  File? selectedFile;
  String status = "";

  // pick any file
  Future<void> pickFile() async {
    final result = await FilePicker.platform.pickFiles();

    if (result != null && result.files.single.path != null) {
      setState(() {
        selectedFile = File(result.files.single.path!);
        status = "File selected";
      });
    }
  }

  // upload file
  Future<void> uploadFile() async {
    if (selectedFile == null) {
      setState(() {
        status = "Please select a file first";
      });
      return;
    }

    final res = await ApiService.uploadFile(selectedFile!);

    setState(() {
      status = res["success"] == true
          ? "Upload Successful ✅"
          : "Upload Failed ❌";
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Upload File")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(onPressed: pickFile, child: const Text("Pick File")),
            const SizedBox(height: 15),
            ElevatedButton(
              onPressed: uploadFile,
              child: const Text("Upload File"),
            ),
            TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => DocumentsScreen()),
                );
              },
              child: Text("Documents"),
            ),
            const SizedBox(height: 20),
            Text(status, style: const TextStyle(fontSize: 16)),
          ],
        ),
      ),
    );
  }
}
