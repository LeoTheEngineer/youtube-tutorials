import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:timeago/timeago.dart' as timeago;
import '/flutter_flow/lat_lng.dart';
import '/flutter_flow/place.dart';
import '/flutter_flow/uploaded_file.dart';
import '/flutter_flow/custom_functions.dart';
import '/backend/backend.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '/backend/schema/structs/index.dart';
import '/auth/firebase_auth/auth_util.dart';

List<EventRecord> filterOrdering(
  List<EventRecord> list,
  String searchText,
  bool timeOrder,
  int maxShow,
) {
  List<EventRecord> filteredRecords = list
      .where(
          (item) => item.url.toLowerCase().contains(searchText.toLowerCase()))
      .toList();
  if (!timeOrder) {
    filteredRecords = List.from(filteredRecords.reversed);
  }
  if (maxShow < filteredRecords.length) {
    filteredRecords = filteredRecords.sublist(0, maxShow);
  }
  return filteredRecords;
}
