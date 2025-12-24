import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../services/api_services.dart';

class DocumentsScreen extends StatefulWidget {
  const DocumentsScreen({super.key});

  @override
  State<DocumentsScreen> createState() => _DocumentsScreenState();
}

class _DocumentsScreenState extends State<DocumentsScreen> {
  List<Map<String, dynamic>> docs = [];
  bool loading = true;
  String error = "";

  @override
  void initState() {
    super.initState();
    fetchDocuments();
  }

  Future<void> fetchDocuments() async {
    try {
      final res = await ApiService.fetchDocuments();
      if (res["success"] == true) {
        setState(() {
          docs = List<Map<String, dynamic>>.from(res["documents"]);
          loading = false;
        });
      } else {
        setState(() {
          loading = false;
          error = "Failed to load documents";
        });
      }
    } catch (e) {
      setState(() {
        loading = false;
        error = e.toString();
      });
    }
  }

  Future<void> preview(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text("Cannot open URL")));
    }
  }

  Future<void> download(String url) async {
    // Opens URL in browser, user can download from there
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text("Cannot download file")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Documents Library")),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : error.isNotEmpty
          ? Center(child: Text(error))
          : docs.isEmpty
          ? const Center(child: Text("No documents uploaded yet"))
          : ListView.builder(
              itemCount: docs.length,
              itemBuilder: (context, index) {
                final doc = docs[index];
                return Card(
                  margin: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 5,
                  ),
                  child: ListTile(
                    leading: doc['resource_type'] == 'image'
                        ? Image.network(doc['url'], width: 50)
                        : const Icon(Icons.insert_drive_file, size: 40),
                    title: Text(doc['public_id']),
                    subtitle: Text(doc['format'] ?? ''),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(
                            Icons.visibility,
                            color: Colors.blue,
                          ),
                          onPressed: () => preview(doc['url']),
                        ),
                        IconButton(
                          icon: const Icon(Icons.download, color: Colors.green),
                          onPressed: () => download(doc['url']),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}
