/* eslint-disable @typescript-eslint/ban-ts-comment */
// From https://github.com/donavon/use-event-listener
// MIT License
//
// Copyright (c) 2018-present Donavon West
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { MutableRefObject, useRef, useEffect } from "react";

export type Options = {
  /** The element to listen on. Defaults to `global` (i.e. `window`). */
  element?: EventTarget | MutableRefObject<EventTarget | null> | null;
  /** Indicates events will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. */
  capture?: boolean;
  /** Indicates that the handler will never call `preventDefault()`. */
  passive?: boolean;
  /** Indicates that the handler should be invoked at most once after being added. If true, the handler would be automatically removed when invoked. */
  once?: boolean;
};

/** Provides a declarative addEventListener */
export const useEventListener = <K extends keyof HTMLElementEventMap>(
  /** eventName - The name of the event. */
  eventName: K,
  /** A function that handles the event or an object implementing the `EventListener` interface. */
  handler: (event: HTMLElementEventMap[K]) => void,
  /** A optional object containing `element`, `capture`, `passive`, and `once`. */
  options: Options = {}
) => {
  const savedHandlerRef = useRef<(event: HTMLElementEventMap[K]) => void>();
  const { element = window, capture, passive, once } = options;

  useEffect(() => {
    savedHandlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    const isRefObject = element?.hasOwnProperty("current");
    const currentTarget = isRefObject
      ? (element as MutableRefObject<EventTarget | null>).current
      : (element as EventTarget | null);

    if (
      currentTarget === null ||
      typeof currentTarget.addEventListener !== "function"
    ) {
      return;
    }

    const eventListener = (evt: HTMLElementEventMap[K]) => {
      savedHandlerRef.current!(evt);
    };

    const opts = { capture, passive, once };
    // @ts-ignore
    currentTarget.addEventListener(eventName, eventListener, opts);
    return () => {
      // @ts-ignore
      currentTarget.removeEventListener(eventName, eventListener, opts);
    };
  }, [eventName, element, capture, passive, once]);
};
