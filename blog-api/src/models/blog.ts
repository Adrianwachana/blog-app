/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Schema, model, Types, HydratedDocument } from 'mongoose';

/**
 * Custom modules
 */
import { genSlug } from '@/utils';

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  banner: {
    publicId: string;
    url: string;
    width: number;
    height: number;
  };
  author: Types.ObjectId;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  status: 'draft' | 'published';
}

/**
 * Blog schema
 */
const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxLength: [180, 'Title must be less than 180 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: [true, 'Slug must be unique'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    banner: {
      publicId: {
        type: String,
        required: [true, 'Banner public id is required'],
      },
      url: {
        type: String,
        required: [true, 'Banner URL is required'],
      },
      width: {
        type: Number,
        required: [true, 'Banner width is required'],
      },
      height: {
        type: Number,
        required: [true, 'Banner height is required'],
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: {
        values: ['draft', 'published'],
        message: '{VALUE} is not supported',
      },
      default: 'draft',
    },
  },
  {
    timestamps: {
      createdAt: 'publishedAt',
    },
  },
);

/**
 * FIX: after genSlug produces the base slug, we:
 * 1) Force lowercase here (defensive safety in case genSlug changes)
 * 2) Strip any characters that are not a–z, 0–9, or a hyphen
 *    (removes commas, periods, emojis, and other punctuation)
 * 3) Collapse consecutive hyphens into one
 * 4) Trim leading and trailing hyphens
 *
 * This ensures a title like:
 *   "Into the Glade, Uninvited."
 * never produces:
 *   "into-the-glade,-uninvited.-xxxxx"
 * and instead becomes:
 *   "into-the-glade-uninvited-xxxxx"
 *
 * NOTE:
 * The slug is generated only once (when it does not already exist)
 * to preserve URL stability and SEO if the title is edited later.
 */
blogSchema.pre('validate', function (this: HydratedDocument<IBlog>) {
  if (this.title && !this.slug) {
    const raw = genSlug(this.title).toLowerCase();

    this.slug = raw
      .replace(/[^a-z0-9-]/g, '') // keep only lowercase letters, digits, and hyphens
      .replace(/-+/g, '-')        // collapse multiple hyphens into one
      .replace(/^-|-$/g, '');     // trim leading and trailing hyphens
  }
});

export default model<IBlog>('Blog', blogSchema);
