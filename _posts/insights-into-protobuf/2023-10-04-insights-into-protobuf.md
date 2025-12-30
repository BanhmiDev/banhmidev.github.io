---
layout: single
title:  "Insights into Protocol Buffers (Protobuf)"
date:   2023-10-04 12:29:20 +0300
categories: blog
tags: programming
usemathjax: true
---

I had the opportunity to work with Protocol Buffers (Protobuf) recently, and I wanted to share some insights and a quick guide for those who might be new to it.

# Protocol Buffers: Quick Guide

Protobuf is a compact and strongly typed way to serialize structured data. It’s widely used with gRPC and backend services where performance and schema stability matter more than human readability. Pioneered by Google.

## Why Protobuf?

- Smaller and faster than JSON or XML  
- Strongly typed schemas  
- Built-in backward and forward compatibility  
- Language- and platform-neutral  

## Minimal Example

```proto
message User {
  int32 id = 1;
  string firstname = 2;
  string lastname = 3;
  bool is_active = 4;
}
```

A .proto file defines your data structure. Field numbers are required, must be unique, and should never change once published.

## Binary Format Layer

With Protobuf, you define your data structure in a .proto file. You then use the Protobuf compiler (`protoc`) to generate code in your target programming language (e.g., Python, Java, Go, C++, etc.). This generated code includes classes for your messages and methods to serialize and deserialize them.

Due to its binary format, Protobuf is much more compact than text-based formats like JSON or XML, making it ideal for high-performance applications, although it sacrifices human readability.

## Language-Neutral, but still Opinionated

Each field has a type (int32, string, bool, etc.) and a unique number. Protobuf supports nested messages, enums, repeated fields (arrays), and maps (dictionaries). There's a few quirks to be aware of: 

- field names are cosmetic only; serialization relies on field numbers
- field numbers 19000-19999 are reserved for internal use
- default values are used when fields are missing (e.g., 0 for numbers, empty string for strings, false for booleans)
- binary format is not human-readable
- hard limits and sizes
- focus on compatibility; fields never get removed or re-used, only deprecated
