import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import {
	IconArrowBackUp,
	IconArrowForwardUp,
	IconBold,
	IconCode,
	IconH1,
	IconH2,
	IconH3,
	IconItalic,
	IconQuote,
	IconSend,
	IconTrash,
} from "@tabler/icons-react";
import { classNames } from "~/utils/classNames";
import { mergeAttributes } from "@tiptap/core";
import { motion } from "framer-motion";

const headingClasses: Record<1 | 2 | 3, string> = {
	1: "text-2xl",
	2: "text-3xl",
	3: "text-lg",
};

interface TipTapProps {
	callback?: Function;
}

export function TipTapEditor({ callback }: TipTapProps): JSX.Element {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Heading.configure({
				levels: [1, 2, 3],
			}).extend({
				renderHTML({ node, HTMLAttributes }) {
					const lvl: 1 | 2 | 3 = node.attrs.level;

					return [
						`h${lvl}`,
						mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
							class: `${headingClasses[lvl]}`,
						}),
						0,
					];
				},
			}),
			Blockquote.configure({
				HTMLAttributes: {
					class: "p-4 my-2 border-l-4 border-gray-300 dark:border-gray-500 ",
				},
			}),
		],
		content: "Start telling your story now...",
		editorProps: {
			attributes: {
				spellcheck: "false",
				class:
					"prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none px-4 py-6 h-[400px] overflow-y-scroll scrollbar-none scrollbar-track-vaporwave-blue-600 scrollbar-thumb-vaporwave-pink-500",
			},
		},
	});

	interface MenuBarProps {
		editor: typeof editor;
	}
	function MenuBar({ editor }: MenuBarProps): JSX.Element | null {
		if (!editor) {
			return null;
		}

		return (
			<section className="px-2 py-1.5 bg-[#404040] rounded-lg text-vaporwave-green-500 flex flex-wrap gap-1 divide-x-2">
				{/* 	<>
					<button
						onClick={() => editor.chain().toggleBold().run()}
						disabled={!editor.can().chain().focus().toggleBold().run()}
						className={editor.isActive("bold") ? "is-active" : ""}
					>
						bold
					</button>
					<button
						onClick={() => editor.chain().focus().toggleItalic().run()}
						disabled={!editor.can().chain().focus().toggleItalic().run()}
						className={editor.isActive("italic") ? "is-active" : ""}
					>
						italic
					</button>
					<button
						onClick={() => editor.chain().focus().toggleStrike().run()}
						disabled={!editor.can().chain().focus().toggleStrike().run()}
						className={editor.isActive("strike") ? "is-active" : ""}
					>
						strike
					</button>
					<button
						onClick={() => editor.chain().focus().toggleCode().run()}
						disabled={!editor.can().chain().focus().toggleCode().run()}
						className={editor.isActive("code") ? "is-active" : ""}
					>
						code
					</button>
					<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
						clear marks
					</button>
					<button onClick={() => editor.chain().focus().clearNodes().run()}>
						clear nodes
					</button>
					<button
						onClick={() => editor.chain().focus().setParagraph().run()}
						className={editor.isActive("paragraph") ? "is-active" : ""}
					>
						paragraph
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
						className={
							editor.isActive("heading", { level: 1 }) ? "is-active" : ""
						}
					>
						h1
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
						className={
							editor.isActive("heading", { level: 2 }) ? "is-active" : ""
						}
					>
						h2
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 3 }).run()
						}
						className={
							editor.isActive("heading", { level: 3 }) ? "is-active" : ""
						}
					>
						h3
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 4 }).run()
						}
						className={
							editor.isActive("heading", { level: 4 }) ? "is-active" : ""
						}
					>
						h4
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 5 }).run()
						}
						className={
							editor.isActive("heading", { level: 5 }) ? "is-active" : ""
						}
					>
						h5
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 6 }).run()
						}
						className={
							editor.isActive("heading", { level: 6 }) ? "is-active" : ""
						}
					>
						h6
					</button>
					<button
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={editor.isActive("bulletList") ? "is-active" : ""}
					>
						bullet list
					</button>
					<button
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={editor.isActive("orderedList") ? "is-active" : ""}
					>
						ordered list
					</button>
					<button
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						className={editor.isActive("codeBlock") ? "is-active" : ""}
					>
						code block
					</button>
					<button
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						className={editor.isActive("blockquote") ? "is-active" : ""}
					>
						blockquote
					</button>
					<button
						onClick={() => editor.chain().focus().setHorizontalRule().run()}
					>
						horizontal rule
					</button>
					<button onClick={() => editor.chain().focus().setHardBreak().run()}>
						hard break
					</button>
					<button
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().chain().focus().undo().run()}
					>
						undo
					</button>
					<button
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().chain().focus().redo().run()}
					>
						redo
					</button>
				</> */}

				<div className="flex items-center justify-center w-fit pl-1 gap-2">
					<button
						onClick={() => editor.chain().clearContent().run()}
						disabled={!editor.can().chain().clearContent().run()}
						className={classNames("rounded-md p-0.5 cursor-pointer")}
					>
						<IconTrash />
					</button>
					<button
						onClick={() => editor.chain().undo().run()}
						disabled={!editor.can().chain().undo().run()}
						className={classNames("rounded-md px-1 py-0.5 cursor-pointer")}
					>
						<IconArrowBackUp />
					</button>
					<button
						onClick={() => editor.chain().redo().run()}
						disabled={!editor.can().chain().redo().run()}
						className={classNames("rounded-md px-1 py-0.5 cursor-pointer")}
					>
						<IconArrowForwardUp />
					</button>
				</div>

				<div className="flex items-center justify-center w-fit pl-2 ml-1 gap-2">
					<button
						onClick={() => editor.chain().toggleBold().run()}
						className={classNames("rounded-md p-0.5 cursor-pointer")}
					>
						<IconBold stroke={editor.isActive("bold") ? 2.75 : 1.75} />
					</button>
					<button
						onClick={() => editor.chain().toggleItalic().run()}
						className={classNames("rounded-md p-0.5 cursor-pointer")}
					>
						<IconItalic stroke={editor.isActive("italic") ? 2.75 : 1.75} />
					</button>
					<button
						onClick={() => editor.chain().toggleCodeBlock().run()}
						className={classNames("rounded-md p-0.5 cursor-pointer")}
					>
						<IconCode stroke={editor.isActive("codeBlock") ? 2.75 : 1.75} />
					</button>
					{/* ================ */}
					<button
						onClick={() => editor.chain().toggleHeading({ level: 1 }).run()}
						className={classNames("rounded-md p-0.5 cursor-pointer")}
					>
						<IconH1
							stroke={editor.isActive("heading", { level: 1 }) ? 2.75 : 1.75}
						/>
					</button>
					<button
						onClick={() => editor.chain().toggleHeading({ level: 2 }).run()}
						className={classNames("rounded-md p-0.5 cursor-pointer")}
					>
						<IconH2
							stroke={editor.isActive("heading", { level: 2 }) ? 2.75 : 1.75}
						/>
					</button>
					<button
						onClick={() => editor.chain().toggleHeading({ level: 3 }).run()}
						className={classNames("rounded-md p-0.5 cursor-pointer")}
					>
						<IconH3
							stroke={editor.isActive("heading", { level: 3 }) ? 2.75 : 1.75}
						/>
					</button>
					<button
						onClick={() => editor.chain().toggleBlockquote().run()}
						className={classNames("rounded-md p-0.5 cursor-pointer")}
					>
						<IconQuote stroke={editor.isActive("blockquote") ? 2.75 : 1.75} />
					</button>
				</div>

				<div className="ml-auto pl-4 pr-1 ">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => callback && callback(editor?.getHTML())}
						className="bg-vaporwave-green-500 text-vaporwave-pink-500 items-center flex gap-1 py-2 px-3 rounded-md"
					>
						<IconSend size={18} />{" "}
						<span className="font-bold text-lg uppercase">post</span>{" "}
					</motion.button>{" "}
				</div>
			</section>
		);
	}

	return (
		<div className="bg-[#505050]/60 rounded-lg">
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}
