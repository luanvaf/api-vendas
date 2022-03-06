import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { Router } from 'express';
import UsersController from '../Controllers/UsersController';
import isAutenticated from '../../../shared/http/middlewares/isAutenticated';
import UserAvatarController from '../Controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarContreller = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAutenticated, usersController.index);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.update,
);

usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.delete,
);

usersRouter.patch(
  '/avatar',
  isAutenticated,
  upload.single('avatar'),
  usersAvatarContreller.update,
);

export default usersRouter;
