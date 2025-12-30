---
layout: single
title:  "The Case for Godot's GDExtension System"
date:   2024-11-09 15:00:00 +0300
categories: blog
tags: programming godot gamedev
usemathjax: true
---

Godot 4 introduced GDExtension, a modern, flexible system for extending the engine with native code. For developers looking to use Rust, Swift, or other languages, GDExtension offers a unique combination of performance, safety, and modularity. Something that neither Unity nor Unreal handles quite the same way.

## Why Godot’s Approach Beats Unity and Unreal in Some Cases

| Feature | Godot (GDExtension) | Unity (Native Plugins) | Unreal (C++ Modules) |
|---------|---------------------|-------------------------|----------------------|
| Multi-language support | ✅ Any C-ABI language (Rust, Swift, C, C++, etc.) | ⚠ C/C++ via native plugins; C# via separate runtime | ❌ C++ only; other languages require wrappers |
| Engine coupling | ✅ Fully decoupled; loads as separate libraries | ⚠ External but tightly bound to Unity API | ❌ Compiled into engine binary |
| Version stability | ✅ Stable ABI across compatible versions | ⚠ Frequent API breaks on updates | ⚠ Requires recompilation on engine updates |
| Distribution | ✅ Distribute as plugin without engine recompile | ✅ Distribute as .dll/.so/.dylib | ❌ Must distribute modified engine build |

GDExtension lets developers write native code without compromising modularity or safety, a balance Unity and Unreal don’t fully provide, and probably never will due to their inherent architecture decision.

Actively maintained bindings exist for several popular languages like Rust and Swift:

Rust bindings: [gdext](https://github.com/godot-rust/gdext)                        
Swift bindings: [SwiftGodot](https://github.com/migueldeicaza/SwiftGodot)

There are also bindings available for [Lua](https://github.com/gilzoide/lua-gdextension), [Go](https://github.com/quaadgras/graphics.gd), and even [Dart](https://github.com/fuzzybinary/godot_dart) (I do not know why, but the maintainer seems quite passionate about the project).

## C# GDExtension Roadmap

A [proposal](https://github.com/godotengine/godot-proposals/issues/7895) is underway to separate C# support from the engine core and integrate it as a GDExtension, which could bring benefits like better maintainability.
This would allow C# to leverage the same modularity and update stability that GDExtension provides, making it easier to keep up with engine changes without breaking existing projects, replacing the somewhat duck-taped approach currently used.